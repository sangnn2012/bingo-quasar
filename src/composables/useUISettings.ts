import { ref } from 'vue';

/** Available icons for marking tiles */
export const ICON_LIST = ['done', 'pets', 'eco', 'bolt', 'clear', 'sentiment_neutral'] as const;

export type IconName = (typeof ICON_LIST)[number];

/**
 * Composable for managing UI customization settings
 */
export function useUISettings() {
  const mainIcon = ref<IconName>('done');
  const mainColor = ref('#fa86c4');
  const isSettingsOpen = ref(true);

  return {
    mainIcon,
    mainColor,
    isSettingsOpen,
    iconList: ICON_LIST,
  };
}
