import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { Post } from '../../../../types/blog.type'
import { addPost, cancelEditingPost, finishEditingPost } from '../../blogSlice'

const initialFormData: Post = {
  id: '',
  title: '',
  featuredImage: '',
  description: '',
  published: false,
  publishDate: ''
}

export const CreatePost = () => {
  const [formData, setFormData] = useState<Post>(initialFormData)
  const dispatch = useAppDispatch()

  const isEditingPost = useAppSelector((state) => state.blog.isEditingPost)
  const editingPost = useAppSelector((state) => state.blog.editingPost)

  useEffect(() => {
    if (isEditingPost && editingPost) {
      setFormData(editingPost)
    } else {
      setFormData(initialFormData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingPost, editingPost])

  const handleChangeInput =
    (name: keyof Post) => (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [name]: event.target.value }))
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditingPost) {
      dispatch(finishEditingPost(formData))
    } else {
      const postWithId = {
        ...formData,
        id: new Date().toLocaleTimeString()
      }
      dispatch(addPost(postWithId))
    }

    setFormData(initialFormData)
  }

  const handleCancelEditing = () => {
    dispatch(cancelEditingPost())
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleCancelEditing}>
      <div className='mb-6'>
        <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Title
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          required
          value={formData.title}
          onChange={handleChangeInput('title')}
        />
      </div>
      <div className='mb-6'>
        <label htmlFor='featuredImage' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Featured Image
        </label>
        <input
          type='text'
          id='featuredImage'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Url image'
          required
          value={formData.featuredImage}
          onChange={handleChangeInput('featuredImage')}
        />
      </div>
      <div className='mb-6'>
        <div>
          <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Description
          </label>
          <textarea
            id='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Your description...'
            required
            value={formData.description}
            onChange={handleChangeInput('description')}
          />
        </div>
      </div>
      <div className='mb-6'>
        <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Publish Date
        </label>
        <input
          type='datetime-local'
          id='publishDate'
          className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          required
          value={formData.publishDate}
          onChange={handleChangeInput('publishDate')}
        />
      </div>
      <div className='mb-6 flex items-center'>
        <input
          id='publish'
          type='checkbox'
          className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
          checked={formData.published}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, published: e.target.checked }))
          }}
        />
        <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
          Publish
        </label>
      </div>
      <div>
        {!isEditingPost && (
          <button
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            type='submit'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Publish Post
            </span>
          </button>
        )}
        {isEditingPost && (
          <>
            <button
              type='submit'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Update Post
              </span>
            </button>
            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Cancel
              </span>
            </button>
          </>
        )}
      </div>
    </form>
  )
}
