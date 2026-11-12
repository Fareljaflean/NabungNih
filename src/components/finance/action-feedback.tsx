import type { ActionState } from "@/lib/action-state";

export function ActionFeedback({ state }: { state: ActionState }) {
  if (state.error) {
    return (
      <p className="action-feedback-error" role="alert">
        {state.error}
      </p>
    );
  }
  if (state.success) {
    return (
      <p className="action-feedback-success" role="status">
        {state.success}
      </p>
    );
  }
  return null;
}
