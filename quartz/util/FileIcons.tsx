import { QuartzComponentConstructor, QuartzComponentProps } from "../components/types"
import { classNames } from "./lang"

import fs from "fs"
import path from "path"

export type IconFolderOptions = {
  /** Icon root folder, ie `quartz/static/icon`
   * Set to `undefined` to disable (default)
   */
  rootIconFolder?: string
  /** Default icon if needed */
  default: {
    /** Default icon for file, used in ArticleTitle for example, without root rootIconFolder string
     * e.g. `file`
     * set disable to only use the frontmatter icon
     */
    file?: string
    /** Default icon for folder, used in Explorer, without root rootIconFolder string
     * e.g. `folder`
     * set disable to don't use folder icon before title
     * For index, they will use the frontmatter icon if exists
     */
    folder?: string
  }
}

export function getIconAsSVG(opts: Partial<IconFolderOptions>, iconType?: string) {
    const iconFullPath = `${opts.rootIconFolder}/${iconType}.svg`
    let iconAsSVG = ""
    try {
        iconAsSVG = fs.readFileSync(path.join(process.cwd(), iconFullPath), "utf8")
    } catch (e) {
        iconAsSVG = fs.readFileSync(
          path.join(process.cwd(), `${opts.rootIconFolder}/${opts.default?.file}.svg`),
          "utf8",
        )
    }
    return {iconAsSVG, iconFullPath}     
}

export const createArticleIcon = ((userOpts?: Partial<IconFolderOptions>) => {
    const opts = {... userOpts}
    function FileTitleIcon({ fileData, displayClass }: QuartzComponentProps, iconType?: string, title?: string) {
        const {iconAsSVG, iconFullPath} = getIconAsSVG(opts, iconType)
        return (
        <div
          class={classNames(displayClass, "article-title")}
          data-icon={iconFullPath}
          data-hasIcon={true}
        >
          {iconAsSVG && (
            <div class="article-title-icon" dangerouslySetInnerHTML={{ __html: iconAsSVG }} />
          )}
          <h1>{title}</h1>
        </div>
      )
        
    }
    return FileTitleIcon
}) satisfies QuartzComponentConstructor