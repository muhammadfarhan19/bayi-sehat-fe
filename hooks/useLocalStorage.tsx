const useLocalStorage = (key: string) => {
  const get = () => {
    if (typeof localStorage !== 'undefined') return localStorage.getItem(key)
    return ''
  }

  const set = (value: string) => {
    if (typeof localStorage !== 'undefined') return localStorage.setItem(key, value)
  }
  const clear = () => set('')
  return { get, set, clear }
}

export default useLocalStorage
