import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '../useAuth'
import { mockOnAuthStateChanged } from '../../mocks/firebaseAuth.mock';

it('should start with loading state and no user', ()=>{
    mockOnAuthStateChanged.mockImplementation(()=> vi.fn())

    const {result} = renderHook(()=> useAuth())

    expect(result.current.user).toBe(null)
    expect(result.current.isLoading).toBe(true)
});

it('should set user and stop loading when auth fires', async () => {
  const mockUser = {
    uid: '123',
    email: 'test@gmail.com',
  }

  let authCallback: any

  mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
    authCallback = callback
    return vi.fn()
  })

  const { result } = renderHook(() => useAuth())

  authCallback(mockUser)

  await waitFor(() => {
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isLoading).toBe(false)
  })
});

it('should unsubscribe on unmount', () => {
  const unsubscribe = vi.fn()

  mockOnAuthStateChanged.mockImplementation(() => {
    return unsubscribe
  })

  const { unmount } = renderHook(() => useAuth())

  unmount()

  expect(unsubscribe).toHaveBeenCalled()
});

it('should update user when auth state changes multiple times', () => {
  let callback: any

  mockOnAuthStateChanged.mockImplementation((_auth, cb) => {
    callback = cb
    return vi.fn()
  })

  const { result } = renderHook(() => useAuth())

  const user1 = { uid: '1', email: 'a@test.com' }
  const user2 = { uid: '2', email: 'b@test.com' }

  callback(user1)
  expect(result.current.user).toEqual(user1)

  callback(user2)
  expect(result.current.user).toEqual(user2)
})