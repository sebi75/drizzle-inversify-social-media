export type Json =
  | string
  | number
  | boolean
  | null
  | Date
  | Json[]
  | { [key: string]: Json };
