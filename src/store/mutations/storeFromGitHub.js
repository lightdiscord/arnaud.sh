export default (state, [{ data: { user: { repositories } } }, organizations]) => {
    state.repositories = repositories.nodes
    state.organizations = organizations
}
