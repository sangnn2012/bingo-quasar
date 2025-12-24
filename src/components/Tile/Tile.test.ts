import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tile from './Index.vue';

describe('Tile', () => {
  it('renders number when provided', () => {
    const wrapper = mount(Tile, {
      props: { num: 42 },
    });
    expect(wrapper.text()).toContain('42');
  });

  it('hides number visually when num is -1 (empty cell)', () => {
    const wrapper = mount(Tile, {
      props: { num: -1 },
    });
    const numDiv = wrapper.find('.num');
    expect(numDiv.classes()).not.toContain('hasNum');
  });

  it('shows hasNum class when number is provided', () => {
    const wrapper = mount(Tile, {
      props: { num: 77 },
    });
    const numDiv = wrapper.find('.num');
    expect(numDiv.classes()).toContain('hasNum');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(Tile, {
      props: { num: 42 },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('applies mainColor background for empty cells', () => {
    const wrapper = mount(Tile, {
      props: { num: -1, mainColor: '#ff0000' },
    });
    const tile = wrapper.find('.tile');
    expect(tile.attributes('style')).toContain('background-color');
    // Browser converts hex to rgb, so check for the color value
    expect(tile.attributes('style')).toMatch(/rgb\(255,\s*0,\s*0\)|#ff0000/i);
  });

  it('does not apply background color for numbered cells', () => {
    const wrapper = mount(Tile, {
      props: { num: 42, mainColor: '#ff0000' },
    });
    const tile = wrapper.find('.tile');
    expect(tile.attributes('style')).toBeFalsy();
  });

  it('shows tick icon when tick is true and cell has number', () => {
    const wrapper = mount(Tile, {
      props: { num: 42, tick: true, mainIcon: 'done' },
      global: {
        stubs: {
          'q-icon': {
            template: '<span class="q-icon-stub" :name="$attrs.name"></span>',
            inheritAttrs: true,
          },
        },
      },
    });
    const icon = wrapper.find('.tick');
    expect(icon.exists()).toBe(true);
  });

  it('hides tick icon when tick is false', () => {
    const wrapper = mount(Tile, {
      props: { num: 42, tick: false, mainIcon: 'done' },
      global: {
        stubs: {
          'q-icon': {
            template: '<span class="q-icon-stub" :name="$attrs.name"></span>',
            inheritAttrs: true,
          },
        },
      },
    });
    const icon = wrapper.find('.tick');
    // v-show makes it invisible but still in DOM
    expect(icon.isVisible()).toBe(false);
  });
});
