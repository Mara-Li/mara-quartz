import { htmlToJsx } from "../../util/jsx"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"

function Content({ fileData, tree }: QuartzComponentProps) {
  const content = htmlToJsx(fileData.filePath!, tree)
  const frontmatter = fileData.frontmatter
  let cssClasses = []
  if (frontmatter?.cssclasses) {
    cssClasses = frontmatter.cssclasses
  } else if (frontmatter?.cssClasses) {
    cssClasses = frontmatter.cssClasses
  }
  const css: string = cssClasses.join(" ")
  return <article class={`popover-hint ${css}`}>{content}</article>
}

export default (() => Content) satisfies QuartzComponentConstructor
