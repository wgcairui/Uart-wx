// miniprogram/pages/admin/node/node.ts
// 管理员查询 LADS 节点状态（IP/Port/最大连接数/已用连接数 + 使用比例）
// 视觉规范见 docs/style-guide.md

import api from "../../../utils/api"

interface NodeInfo {
  Name: string
  IP: string
  Port: number
  MaxConnections: number
  count: number
  useRatio: number       // 0-100
  useRatioLabel: string  // 25%
  status: 'normal' | 'busy' | 'full'
  statusLabel: string
}

Page({
  data: {
    nodes: [] as NodeInfo[],
    totalNodes: 0,
    totalMax: 0,
    totalUsed: 0,
    overallRatio: 0,
    overallRatioLabel: '0%',
  },

  onLoad: function () {
    this.loadNodes()
  },

  onPullDownRefresh: async function () {
    await this.loadNodes()
    wx.stopPullDownRefresh()
  },

  async loadNodes() {
    const { data } = await api.Nodes()
    this.rebuildNodes(data || [])
  },

  /**
   * 派生节点卡（每节点带 useRatio / status / statusLabel）
   * 状态：normal（< 60%）/ busy（60-90%）/ full（> 90%）
   */
  rebuildNodes(rawNodes: Uart.NodeClient[]) {
    const nodes: NodeInfo[] = rawNodes.map((el: any) => {
      const max = el.MaxConnections || 0
      const used = el.count || 0
      const ratio = max > 0 ? Math.min(100, Math.round((used / max) * 100)) : 0
      let status: NodeInfo['status'] = 'normal'
      let statusLabel = '正常'
      if (ratio >= 90) { status = 'full'; statusLabel = '满载' }
      else if (ratio >= 60) { status = 'busy'; statusLabel = '繁忙' }
      return {
        Name: el.Name,
        IP: el.IP,
        Port: el.Port,
        MaxConnections: max,
        count: used,
        useRatio: ratio,
        useRatioLabel: `${ratio}%`,
        status,
        statusLabel,
      }
    })

    const totalMax = nodes.reduce((acc, n) => acc + n.MaxConnections, 0)
    const totalUsed = nodes.reduce((acc, n) => acc + n.count, 0)
    const overallRatio = totalMax > 0 ? Math.round((totalUsed / totalMax) * 100) : 0

    this.setData({
      nodes,
      totalNodes: nodes.length,
      totalMax,
      totalUsed,
      overallRatio,
      overallRatioLabel: `${overallRatio}%`,
    })
  },
})
