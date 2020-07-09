export const DATA_CURRENT_SET = "DATA_CURRENT_SET";

export function setCurrentData(data) {
  return {
    type: DATA_CURRENT_SET,
    data,
  };
}

export function dataRemove() {
  return (dispatch) => {
    dispatch(setCurrentData({}));

    return { success: true };
  };
}
