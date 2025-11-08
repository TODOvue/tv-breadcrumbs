import { computed, getCurrentInstance } from 'vue'

export function useBreadcrumb(props, emit) {
  const inst = getCurrentInstance()
  const gp =
    (inst && inst.appContext && inst.appContext.config && inst.appContext.config.globalProperties) ||
    {}
  
  const route = gp.$route || null
  const router = gp.$router || null
  
  const autoItems = computed(() => {
    if (!props.autoGenerate) return []
    if (!route) return []
    
    const matched = route.matched || []
    
    const fromMeta = matched
      .map(r => {
        const m = r.meta && r.meta.breadcrumb
        if (!m) return null
        if (typeof m === 'function') return m(route)
        if (Array.isArray(m)) return m
        if (typeof m === 'string') return [{ label: m, href: r.path }]
        return null
      })
      .filter(Boolean)
      .flat()
    
    if (fromMeta.length > 0) {
      return normalize(fromMeta)
    }
    
    const pathString = String(route.path || '')
    const segments = pathString.split('/').filter(Boolean)
    
    const acc = []
    let current = ''
    
    for (const seg of segments) {
      current += `/${seg}`
      acc.push({
        label: humanize(seg),
        href: current
      })
    }
    
    return normalize([{ label: props.homeLabel, href: '/' }, ...acc])
  })
  
  const baseItems = computed(() => {
    const hasItems = Array.isArray(props.items) && props.items.length > 0
    if (hasItems) {
      return normalize(props.items)
    }
    return autoItems.value
  })
  
  const itemsToRender = computed(() => {
    const items = baseItems.value
    const max = Number(props.maxItems || 0)
    
    if (!max || items.length <= max) {
      return items
    }
    
    const lastCount = Math.max(2, max - 1)
    const head = items[0]
    const tail = items.slice(-lastCount)
    
    return [
      head,
      { label: '…', href: null, key: '__ellipsis__', disabled: true },
      ...tail
    ]
  })
  
  function handleClick(evt, item, index) {
    if (!item || item.disabled) return
    
    emit('item-click', {
      item,
      index,
      event: evt
    })
    
    const isLast = index === itemsToRender.value.length - 1
    if (!item.href || isLast) return
    
    if (router && typeof router.push === 'function') {
      evt.preventDefault()
      router.push(item.href)
      emit('navigate', {
        to: item.href,
        item,
        index
      })
    }
  }
  
  return {
    itemsToRender,
    handleClick
  }
}

function humanize(segment) {
  return segment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function normalize(arr) {
  return arr
    .filter(Boolean)
    .map((x, i) => {
      if (typeof x === 'string') {
        return { label: x, href: null, key: `i-${i}` }
      }
      
      const label = x.label != null ? String(x.label) : ''
      const href = x.href != null && x.href !== '' ? x.href : null
      const key = x.key != null ? x.key : `i-${i}`
      
      return {
        ...x,
        label,
        href,
        key
      }
    })
}
