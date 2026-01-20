import Default from './demos/default.vue?raw';
import MaxItems from './demos/maxItems.vue?raw';
import ModifySeparator from './demos/modifySeparator.vue?raw';
import ModifySeparator2 from './demos/modifySeparator2.vue?raw';
import AutoGenerate from './demos/autoGenerate.vue?raw';
import Icons from './demos/icons.vue?raw';
import ActiveLink from './demos/activeLink.vue?raw';

export const demos = [
  {
    id: 1,
    title: 'Basic Usage',
    description: 'A simple breadcrumb navigation example.',
    propsData: {
      homeLabel: 'Inicio',
      items: [
        { label: 'Home', href: '/' },
        { label: 'Docs', href: '/docs' },
        { label: 'API', href: '/docs/api' },
        { label: 'v1', href: '/docs/api/v1' },
        { label: 'Auth', href: '/docs/api/v1/auth' },
        { label: 'Scopes' }
      ],
      itemClick: onItemClick,
      navigate: onNavigate,
    },
    html: Default,
  },
  {
    id: 2,
    title: 'With max items',
    description: 'Breadcrumb navigation with a maximum number of items displayed. Click the ellipsis to see hidden items.',
    propsData: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Docs', href: '/docs' },
        { label: 'API', href: '/docs/api' },
        { label: 'v1', href: '/docs/api/v1' },
        { label: 'Auth', href: '/docs/api/v1/auth' },
        { label: 'Scopes' }
      ],
      maxItems: 4,
      itemClick: onItemClick,
      navigate: onNavigate,
    },
    html: MaxItems,
  },
  {
    id: 3,
    title: 'Modify Separator',
    description: 'Breadcrumb navigation with a custom separator.',
    propsData: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Docs', href: '/docs' },
        { label: 'API', href: '/docs/api' },
        { label: 'v1', href: '/docs/api/v1' },
        { label: 'Auth', href: '/docs/api/v1/auth' },
        { label: 'Scopes' }
      ],
      separator: '→',
      itemClick: onItemClick,
      navigate: onNavigate,
    },
    html: ModifySeparator,
  },
  {
    id: 4,
    title: 'Modify Separator (/)',
    description: 'Breadcrumb navigation with a custom separator (/).',
    propsData: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Docs', href: '/docs' },
        { label: 'API', href: '/docs/api' },
        { label: 'v1', href: '/docs/api/v1' },
        { label: 'Auth', href: '/docs/api/v1/auth' },
        { label: 'Scopes' }
      ],
      separator: '/',
      itemClick: onItemClick,
      navigate: onNavigate,
    },
    html: ModifySeparator2,
  },
  {
    id: 5,
    title: 'Auto Generate Breadcrumbs',
    description: 'Breadcrumb navigation that auto-generates items based on the current route.',
    propsData: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Docs', href: '/docs' },
        { label: 'Guides', href: '/docs/guides' },
        { label: 'Install' }
      ],
      itemClick: onItemClick,
      navigate: onNavigate,
    },
    html: AutoGenerate,
  },
  {
    id: 6,
    title: 'With Icons',
    description: 'Breadcrumb items with icons.',
    propsData: {
      items: [
        { label: 'Home', href: '/', icon: 'fa-solid fa-house' },
        { label: 'Settings', href: '/settings', icon: 'fa-solid fa-gear' },
        { label: 'Profile', icon: 'fa-solid fa-user' }
      ],
      itemClick: onItemClick,
      navigate: onNavigate,
    },
    html: Icons,
  },
  {
    id: 7,
    title: 'Active Link',
    description: 'The current page item is rendered as a link.',
    propsData: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Post-123', href: '/blog/post-123' }
      ],
      activeLink: true,
      itemClick: onItemClick,
      navigate: onNavigate,
    },
    html: ActiveLink,
  }
];

function onItemClick({ item, index, event }) {
  console.log('item-click', { item, index, event })
}

function onNavigate({ to, item, index }) {
  console.log('navigate', { to, item, index })
}
