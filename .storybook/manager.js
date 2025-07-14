import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

// Import the theme configuration
import { storybookTheme } from './theme';

// Configure the Storybook manager
addons.setConfig({
  theme: storybookTheme,
  
  // Panel configuration
  panelPosition: 'bottom',
  selectedPanel: 'controls',
  
  // Sidebar configuration
  sidebar: {
    showRoots: true,
    collapsedRoots: ['Examples'],
  },
  
  // Toolbar configuration
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  
  // Initial active tab
  initialActive: 'sidebar',
  
  // Enable shortcuts
  enableShortcuts: true,
  
  // Show nav
  showNav: true,
  
  // Show panel
  showPanel: true,
  
  // Show toolbar
  showToolbar: true,
});

// Add custom CSS to the manager
const style = document.createElement('style');
style.innerHTML = `
  /* Custom styling for Storybook manager */
  .sidebar-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .sidebar-item[data-selected="true"] {
    background: rgba(255, 255, 255, 0.1) !important;
    color: white !important;
  }
  
  .sidebar-item:hover {
    background: rgba(255, 255, 255, 0.05) !important;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  /* Hide Storybook branding in production */
  .sidebar-header a[title="Storybook"] {
    display: none;
  }
  
  /* Custom welcome message */
  .welcome {
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

document.head.appendChild(style);

// Add version information
const versionInfo = document.createElement('div');
versionInfo.innerHTML = `
  <div style="
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
    font-family: 'Roboto', sans-serif;
  ">
    Component Library v1.0.0
  </div>
`;

// Add version info when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(versionInfo);
});