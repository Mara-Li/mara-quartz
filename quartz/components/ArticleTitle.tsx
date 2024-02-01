import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { getIconAsSVG, IconFolderOptions } from "../util/FileIcons"

export default ((userOpts?: Partial<IconFolderOptions>) => {
  const opts = {...userOpts }
  function ArticleTitle({ fileData, displayClass }: QuartzComponentProps) {
    const title = fileData.frontmatter?.title
    const iconType = fileData.frontmatter?.icon || opts.default?.file
    if (title) {
      if (!opts.rootIconFolder || !iconType) {
        return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
      }
      const {iconAsSVG, iconFullPath} = getIconAsSVG(opts, iconType as string)
      
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
    } else {
      return null
    }
  }

  ArticleTitle.css = `
  .article-title {
    margin: 2rem 0 0 0;
  }
  .article-title[data-hasicon="true"] {
    display: flex;
    align-items: center;
    margin: 0 !important;
  }
  .article-title-icon {
    margin-right: 1rem;
  }
  .article-title[data-hasicon="true"] > h1 {
    margin: 0;
  }
  `
  return ArticleTitle
}) satisfies QuartzComponentConstructor
