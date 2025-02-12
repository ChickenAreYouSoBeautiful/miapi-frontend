/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  return {
    canUser: initialState?.loginUser,
    canAdmin: initialState?.loginUser && initialState.loginUser?.userRole === 'admin',
  };
}
