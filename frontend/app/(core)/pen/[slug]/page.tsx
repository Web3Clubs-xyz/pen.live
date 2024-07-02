import PenPage from '@/components/common/layout/pen-page'
import React from 'react'

const Pen = ({ params }: { params: { slug: string } }) => {
  return (
    <section>
        <PenPage />
    </section>
  )
}

export default Pen