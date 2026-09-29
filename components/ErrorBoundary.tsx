"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  /** Rendered instead of the children if they throw (or fail to load). */
  fallback?: ReactNode;
};

type ErrorBoundaryState = { hasError: boolean };

/**
 * Keeps a failure in one isolated widget (e.g. the lazily loaded chat) from
 * taking down the whole page.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Widget failed:", error, info.componentStack);
  }

  render() {
    return this.state.hasError ? (this.props.fallback ?? null) : this.props.children;
  }
}
