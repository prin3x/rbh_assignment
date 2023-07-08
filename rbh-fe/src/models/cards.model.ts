export interface CardEntity {
    _id: string
    title: string
    description: string
    avatar: string
    status: string
    createdBy: string
    comments: CommentEntity[]
    createdAt: string
    updatedAt: string
    __v: number
}


export interface CommentEntity {
    _id?: string
    comment: string
    createdBy: string
    createdAt?: string
    updatedAt?: string
    __v?: number
}

