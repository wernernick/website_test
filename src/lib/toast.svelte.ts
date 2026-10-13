/**
 * Toasts: kurze Rückmeldungen nach Aktionen des Nutzers (siehe docs/DESIGN.md).
 * Nur im Browser aufrufen (Event-Handler, onMount), nie während des Server-Renderings,
 * sonst teilen sich Anfragen denselben Zustand.
 */

export type ToastKind = 'success' | 'danger' | 'info';

export interface ToastAction {
	label: string;
	run: () => void;
}

export interface Toast {
	id: number;
	message: string;
	kind: ToastKind;
	action?: ToastAction;
}

export const TOAST_DURATION = 5000;
export const TOAST_DURATION_WITH_ACTION = 8000;
export const TOAST_MAX = 3;

interface Timer {
	remaining: number;
	startedAt: number;
	handle: ReturnType<typeof setTimeout> | null;
}

class ToastStore {
	items = $state<Toast[]>([]);
	#nextId = 1;
	#timers = new Map<number, Timer>();

	show(message: string, options: { kind?: ToastKind; action?: ToastAction } = {}): number {
		const id = this.#nextId++;
		this.items.push({ id, message, kind: options.kind ?? 'success', action: options.action });
		while (this.items.length > TOAST_MAX) this.dismiss(this.items[0].id);

		const duration = options.action ? TOAST_DURATION_WITH_ACTION : TOAST_DURATION;
		this.#timers.set(id, { remaining: duration, startedAt: 0, handle: null });
		this.resume(id);
		return id;
	}

	dismiss(id: number): void {
		const timer = this.#timers.get(id);
		if (timer?.handle) clearTimeout(timer.handle);
		this.#timers.delete(id);
		this.items = this.items.filter((toast) => toast.id !== id);
	}

	/** Hält den Ablauf an, z. B. solange die Maus darüber ist oder der Fokus darin liegt. */
	pause(id: number): void {
		const timer = this.#timers.get(id);
		if (!timer?.handle) return;
		clearTimeout(timer.handle);
		timer.handle = null;
		timer.remaining -= Date.now() - timer.startedAt;
	}

	resume(id: number): void {
		const timer = this.#timers.get(id);
		if (!timer || timer.handle) return;
		timer.startedAt = Date.now();
		timer.handle = setTimeout(() => this.dismiss(id), Math.max(timer.remaining, 0));
	}
}

export const toasts = new ToastStore();
