var snap = snap || {};

snap.constants = {
    data: {
        TARGET: 'data-snap-target',
        ERROR_TARGET: 'data-snap-error-target',
        MODE: 'data-snap-mode',
    },
    mode: {
        APPEND: 'append',
        PREPEND: 'prepend',
        REPLACE: 'replace',
    }
}
snap.constants.modes = [
  snap.constants.mode.APPEND,
  snap.constants.mode.PREPEND,
  snap.constants.mode.REPLACE
]
