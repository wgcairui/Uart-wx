// 保存设备参数解析状态

class unit {
  private cache: Map<string, {
    value: string,
    unit: string,
    parse: {
      [x: string]: string;
    };
    parseArray: {
      [x: string]: string;
    }[];
  }>
  constructor() {
    this.cache = new Map()
  }
  get(value: string | number, unit: string) {
    if (unit && /^{.*}$/.test(unit)) {
      const unitObject = this.cache.get(unit)
      if (unitObject) return unitObject
      else return this.parse(value, unit)
    } else {
      return {
        value,
        unit
      }
    }
  }

  getunitObject(value: string | number, unit: string) {
    const unitObject = this.cache.get(unit)
    if (unitObject) return unitObject.parseArray
    else {
      return this.parse(value, unit).parseArray
    }
  }
  // 转换设备unit
  private parse(value: string | number, unit: string) {
    const arr = unit.replace(/(\{|\}| )/g, "")
      .split(",")
      .map(el => {
        const [key, text] = el.split(":")
        return { [key]: text,key,text }
      })
    const valueStr = String(value)
    const parseObject = Object.assign({}, ...arr) as { [x: string]: string }
    const result = {
      value: parseObject[valueStr],
      unit: '',
      parse: parseObject,
      parseArray: arr
    }
    this.cache.set(unit, result)
    return result
  }
}

export default new unit()