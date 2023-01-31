import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialPostList } from '../../constants/blog'
import { RootState } from '../../store'
import { Post } from '../../types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
  isEditingPost: boolean
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null,
  isEditingPost: false
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.postList.push(action.payload)
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const deletePostId = action.payload
      const deletePostIdIndex = state.postList.findIndex((post) => post.id === deletePostId)
      if (deletePostIdIndex > -1) {
        state.postList.splice(deletePostIdIndex, 1)
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const editingPostId = action.payload
      const editingPost = state.postList.find((post) => post.id === editingPostId)
      if (editingPost) {
        state.isEditingPost = true
        state.editingPost = editingPost
      } else {
        state.isEditingPost = false
        state.editingPost = null
      }
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const editedPost = action.payload
      const editedPostIndex = state.postList.findIndex((post) => post.id === editedPost.id)
      if (editedPostIndex > -1) {
        state.postList[editedPostIndex] = editedPost
        state.editingPost = null
        state.isEditingPost = false
      }
    },
    cancelEditingPost: (state) => {
      state.isEditingPost = false
      state.editingPost = null
    }
  }
})

export const { addPost, deletePost, startEditingPost, finishEditingPost, cancelEditingPost } = blogSlice.actions

export const postList = (state: RootState) => state.blog.postList

export default blogSlice.reducer
