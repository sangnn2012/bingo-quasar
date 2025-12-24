import { describe, it, expect } from 'vitest';
import { useUISettings, ICON_LIST } from './useUISettings';

describe('useUISettings', () => {
  it('returns default mainIcon as "done"', () => {
    const { mainIcon } = useUISettings();
    expect(mainIcon.value).toBe('done');
  });

  it('returns default mainColor as pink', () => {
    const { mainColor } = useUISettings();
    expect(mainColor.value).toBe('#fa86c4');
  });

  it('returns isSettingsOpen as true by default', () => {
    const { isSettingsOpen } = useUISettings();
    expect(isSettingsOpen.value).toBe(true);
  });

  it('provides iconList with all available icons', () => {
    const { iconList } = useUISettings();
    expect(iconList).toEqual(ICON_LIST);
    expect(iconList.length).toBe(6);
    expect(iconList).toContain('done');
    expect(iconList).toContain('pets');
  });

  it('allows changing mainIcon', () => {
    const { mainIcon } = useUISettings();
    mainIcon.value = 'pets';
    expect(mainIcon.value).toBe('pets');
  });

  it('allows changing mainColor', () => {
    const { mainColor } = useUISettings();
    mainColor.value = '#00ff00';
    expect(mainColor.value).toBe('#00ff00');
  });

  it('allows toggling isSettingsOpen', () => {
    const { isSettingsOpen } = useUISettings();
    expect(isSettingsOpen.value).toBe(true);
    isSettingsOpen.value = false;
    expect(isSettingsOpen.value).toBe(false);
  });
});
