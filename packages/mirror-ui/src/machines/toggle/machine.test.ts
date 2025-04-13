import { describe, it, expect, vi } from 'vitest';
import { createToggleMachine } from './machine';

describe('Toggle Machine', () => {
  it('should initialize with default pressed state as false', () => {
    const machine = createToggleMachine();
    const actor = machine.provide({
      actions: {
        togglePressed: () => {},
        setPressed: () => {},
      },
    }).createActor();
    actor.start();
    
    expect(actor.getSnapshot().context.pressed).toBe(false);
  });

  it('should initialize with provided pressed state', () => {
    const machine = createToggleMachine({ pressed: true });
    const actor = machine.provide({
      actions: {
        togglePressed: () => {},
        setPressed: () => {},
      },
    }).createActor();
    actor.start();
    
    expect(actor.getSnapshot().context.pressed).toBe(true);
  });

  it('should toggle pressed state when PRESS.TOGGLE event is sent', () => {
    const machine = createToggleMachine();
    const actor = machine.createActor();
    actor.start();
    
    expect(actor.getSnapshot().context.pressed).toBe(false);
    
    actor.send({ type: 'PRESS.TOGGLE' });
    
    expect(actor.getSnapshot().context.pressed).toBe(true);
    
    actor.send({ type: 'PRESS.TOGGLE' });
    
    expect(actor.getSnapshot().context.pressed).toBe(false);
  });

  it('should set pressed state when PRESS.SET event is sent', () => {
    const machine = createToggleMachine();
    const actor = machine.createActor();
    actor.start();
    
    expect(actor.getSnapshot().context.pressed).toBe(false);
    
    actor.send({ type: 'PRESS.SET', pressed: true });
    
    expect(actor.getSnapshot().context.pressed).toBe(true);
    
    actor.send({ type: 'PRESS.SET', pressed: false });
    
    expect(actor.getSnapshot().context.pressed).toBe(false);
  });

  it('should call onPressedChange when pressed state changes via PRESS.TOGGLE', () => {
    const onPressedChange = vi.fn();
    const machine = createToggleMachine({ onPressedChange });
    const actor = machine.createActor();
    actor.start();
    
    actor.send({ type: 'PRESS.TOGGLE' });
    
    expect(onPressedChange).toHaveBeenCalledTimes(1);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    
    actor.send({ type: 'PRESS.TOGGLE' });
    
    expect(onPressedChange).toHaveBeenCalledTimes(2);
    expect(onPressedChange).toHaveBeenCalledWith(false);
  });

  it('should call onPressedChange when pressed state changes via PRESS.SET', () => {
    const onPressedChange = vi.fn();
    const machine = createToggleMachine({ onPressedChange });
    const actor = machine.createActor();
    actor.start();
    
    actor.send({ type: 'PRESS.SET', pressed: true });
    
    expect(onPressedChange).toHaveBeenCalledTimes(1);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    
    actor.send({ type: 'PRESS.SET', pressed: false });
    
    expect(onPressedChange).toHaveBeenCalledTimes(2);
    expect(onPressedChange).toHaveBeenCalledWith(false);
  });
});
