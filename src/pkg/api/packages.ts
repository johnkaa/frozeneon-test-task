import api from '@/pkg/api'

export default {
  async getPackages() {
    try {
      const { data } = await api().get(`/stats/packages`)
      return data
    } catch (e) {
      console.error(e)
    }
  },

  async getGitPackage(name: string) {
    const user = name.split('/')[0]
    const repo = name.split('/')[1]

    try {
      const { data } = await api().get(`/packages/gh/${user}/${repo}`)
      return data
    } catch (e) {
      console.error(e)
    }
  },

  async getNpmPackage(name: string) {
    try {
      const { data } = await api().get(`/packages/npm/${name}`)
      return data
    } catch (e) {
      console.error(e)
    }
  }
}
