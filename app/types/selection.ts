import type { ApiQuery, PaginatedResponse } from './api'

export interface RecordOption { id: number; label: string }
export type RecordOptionLoader = (query: ApiQuery) => Promise<PaginatedResponse<RecordOption>>
