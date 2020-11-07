import React from 'react'

export default function SearchCreatorCard(Creator) {
    return (
        <div className="searchCreatorCard">
            Creator
            {Creator.name}
        </div>
    )
}
