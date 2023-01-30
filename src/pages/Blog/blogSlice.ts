import { createSlice } from '@reduxjs/toolkit'
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
  reducers: {}
})

// export const {} = blogSlice.actions

export const postList = (state: RootState) => state.blog.postList

export default blogSlice.reducer
