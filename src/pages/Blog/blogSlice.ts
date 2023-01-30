import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialPostList } from '../../constants/blog'
import { RootState } from '../../store'
import { Post } from '../../types/blog.type'

interface BlogState {
  postList: Post[]
}

const initialState: BlogState = {
  postList: initialPostList
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.postList.push(action.payload)
    }
  }
})

export const { addPost } = blogSlice.actions

export const postList = (state: RootState) => state.blog.postList

export default blogSlice.reducer
