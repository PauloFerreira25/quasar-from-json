export function getPageItem (state) {
  return state.currentPage ? state.currentPage.props.item : null
}
