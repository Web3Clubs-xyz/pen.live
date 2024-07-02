import LivestockPage from '@/components/common/layout/livestock-page'
import React from 'react'

const Livestock = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
        <LivestockPage />
    </div>
  )
}

export default Livestock