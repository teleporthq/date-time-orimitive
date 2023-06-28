import { LitElement } from 'lit'
import { customElement } from 'lit/decorators/custom-element.js'
import { property } from 'lit/decorators/property.js'
import dayjs from 'dayjs'

@customElement('date-time-primitive')
export class DangerouslySetInnerHtmlContent extends LitElement {
  @property() declare date: string
  @property() declare format: string
  @property() declare shadow: boolean

  createRenderRoot() {
    return this.shadow ? this.attachShadow({ mode: 'open' }) : this
  }

  render() {
    const dateTime = dayjs.unix(new Date(this.date).getTime() / 1000)
    return dayjs(dateTime).format(this.format)
  }
}
