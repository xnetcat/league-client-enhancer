export const RUNES_CURRENT_SET = "RUNES_CURRENT_SET"

export function setCurrentRunes(data) {
  return {
    type: RUNES_CURRENT_SET,
    data,
  }
}

export function dataRemove() {
  return (dispatch) => {
    dispatch(setCurrentRunes({}))

    return { success: true }
  }
}
