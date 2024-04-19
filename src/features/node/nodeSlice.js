import { createSlice } from "@reduxjs/toolkit";

const graphSlice = createSlice({
  name: "graph",
  initialState: {
    nodes: [],
    branches: [],
  },
  reducers: {
    addNode(state, action) {
      state.nodes.push(action.payload);
    },
    removeNode(state, action) {
      const id = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== id);

      const edgesToDelete = state.branches.filter(
        (edge) => edge.source === id || edge.target === id
      );
      state.branches = state.branches.filter(
        (edge) => !edgesToDelete.includes(edge)
      );
    },
    addBranch(state, action) {
      let connection = action.payload;
      let id = `reactflow__edge-${connection.source}-${connection.target}`;
      let newConnection = { ...connection, id: id };
      state.branches.push(newConnection);
    },
    removeBranch(state, action) {
      const branchIdToRemove = action.payload;
      state.branches = state.branches.filter((branch) => {
        return branchIdToRemove !== branch.id;
      });
    },
  },
});

export const { addNode, removeNode, addBranch, removeBranch } =
  graphSlice.actions;
export default graphSlice.reducer;
