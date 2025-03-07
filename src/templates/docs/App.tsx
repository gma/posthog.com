import React from 'react'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import DocsLayout from 'components/Docs/Layout'
import Link from 'components/Link'
import { GitHub } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import { getCookie } from '../../lib/utils'

export const AppTemplate = ({
    data: { post },
    pageContext: { menu, next, previous, breadcrumb = [], breadcrumbBase, tableOfContents },
}) => {
    const [showCTA, setShowCTA] = React.useState<boolean>(
        typeof window !== 'undefined' ? Boolean(getCookie('ph_current_project_token')) : false
    )

    const {
        body,
        frontmatter,
        contributors,
        fields: { slug },
    } = post
    const { title, github, thumbnail, installUrl, description } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`

    return (
        <DocsLayout
            title={title}
            titleElement={
                <div className="flex flex-col sm:flex-row items-start mb-2">
                    {thumbnail?.publicURL && (
                        <div
                            style={{ height: '52px' }}
                            className="hidden md:flex items-center justify-center shrink-0 mr-2"
                        >
                            <img src={thumbnail.publicURL} alt="app icon" className="w-8 h-8 object-scale-down" />
                        </div>
                    )}

                    <h1 className="block my-0 mr-auto">{title}</h1>

                    <div
                        style={{ height: '52px' }}
                        className="shrink-0 flex items-center space-x-3 mt-3 sm:mt-0 sm:ml-4"
                    >
                        {github && (
                            <Link to={github}>
                                <GitHub className="w-7 h-7 text-black/80 hover:text-black/60 dark:text-white/80 hover:dark:text-white/60 transition-colors" />
                            </Link>
                        )}

                        {installUrl && showCTA && (
                            <CallToAction to={installUrl}>
                                <span className="text-[17px] md:px-1 md:py-0.5">Install</span>
                            </CallToAction>
                        )}
                    </div>
                </div>
            }
            filePath={filePath}
            slug={slug}
            menu={menu}
            lastUpdated={lastUpdated}
            hideAnchor={false}
            tableOfContents={tableOfContents}
            breadcrumb={breadcrumb}
            breadcrumbBase={breadcrumbBase}
            body={body}
            next={next}
            previous={previous}
            hideLastUpdated={false}
            contributors={contributors}
        >
            <SEO
                title={`${title} - PostHog ${breadcrumbBase.name}`}
                description={description || excerpt}
                article
                image={`/og-images/${slug.replace(/\//g, '')}.jpeg`}
            />
        </DocsLayout>
    )
}

export const query = graphql`
    query AppQuery($id: String!) {
        post: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            contributors {
                url
                username
                avatar {
                    childImageSharp {
                        gatsbyImageData(width: 37)
                    }
                }
            }
            frontmatter {
                title
                description
                github
                installUrl
                thumbnail {
                    publicURL
                }
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM D, YYYY")
                    }
                }
            }
        }
    }
`

export default AppTemplate
