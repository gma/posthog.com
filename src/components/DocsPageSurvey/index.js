import cntl from 'cntl'
import { CallToAction } from 'components/CallToAction'
import { ThumbsDown, ThumbsUp } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import { useValues } from 'kea'
import React, { useState } from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

const button = cntl`
    text-lg
    font-bold
    flex
    items-center
    flex-grow
    sm:flex-grow-0
    sm:w-[186px]
    justify-between
    px-4
    py-2
    bg-white
    rounded-sm
    shadow-sm 
    text-black/70 
    hover:text-black/95 
    relative
    active:top-[1px] 
    active:scale-[.97] 
    transition-none 
    transition-colors
`

const ResponseButtons = ({ submitResponse }) => {
    return (
        <>
            <h3 className="text-lg font-bold m-0 mb-3">Was this page useful?</h3>
            <div className="flex space-x-3 items-center">
                <button onClick={() => submitResponse(true)} className={button}>
                    <span>Yes</span>
                    <ThumbsUp />
                </button>
                <button onClick={() => submitResponse(false)} className={button}>
                    <span>No</span>
                    <ThumbsDown />
                </button>
            </div>
        </>
    )
}

const ResponseMessage = () => {
    return (
        <motion.div initial={{ translateY: '100%', opacity: 0 }} animate={{ translateY: 0, opacity: 1 }}>
            <h3 className="text-lg font-bold m-0 mb-3">Thanks for the feedback!</h3>
            <p className="m-0">
                If you need help on any of the above, feel free to create an issue on{' '}
                <a href="https://github.com/PostHog/posthog">our repo</a>, or <a href="/slack">join our Slack</a> where
                a member of our team can assist you! Chances are that if you have a problem or question, someone else
                does too - so please don't hesitate to create a new issue or ask us a question.
            </p>
        </motion.div>
    )
}

export const DocsPageSurvey = () => {
    const [submittedResponse, setSubmittedResponse] = useState(false)
    const { posthog } = useValues(posthogAnalyticsLogic)

    const submitResponse = (wasHelpful) => {
        if (posthog) {
            posthog.capture('docs_page_review', {
                wasHelpful: wasHelpful,
            })
        }
        setSubmittedResponse(true)
    }

    return submittedResponse ? <ResponseMessage /> : <ResponseButtons submitResponse={submitResponse} />
}
