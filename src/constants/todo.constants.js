export const STATUS = {
  active: 'ACTIVE',
  completed: 'COMPLETED'
}

export const TOGGLE_STATUS = {
  [STATUS.active]: STATUS.completed,
  [STATUS.completed]: STATUS.active
}