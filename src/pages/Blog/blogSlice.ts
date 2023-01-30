import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialPostList } from '../../constants/blog'
import { RootState } from '../../store'
import { Post } from '../../types/blog.type'

interface BlogState {
  postList: Post[]
  isEditingPost: boolean
}

const initialState: BlogState = {
  postList: initialPostList,
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
    startEditingPost: (state) => {
      state.isEditingPost = true
    }
  }
})

export const { addPost, deletePost, startEditingPost } = blogSlice.actions

export const postList = (state: RootState) => state.blog.postList

export default blogSlice.reducer
