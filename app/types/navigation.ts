import type { Component } from 'vue'
import type { RoleSlug } from './domain'

export interface NavigationItem { label: string; to: string; icon: Component; roles: RoleSlug[] }
export interface NavigationGroup { label?: string; items: NavigationItem[] }
