import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/timeAgo'
import useUserProfileStore from '../../store/useUserProfileStore'

const Caption = ({ post }) => {

    const userProfile = useUserProfileStore(state => state.userProfile)

    return (
        <Flex gap={4}>
            {/* navigate to the user who has commented */}
            <Link to={`/${userProfile.userName}`}>
                <Avatar src={userProfile.profilePicUrl} size={"sm"} />
            </Link>

            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>

                    <Link to={`/${userProfile.userName}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile.userName}
                        </Text>
                    </Link>

                    <Text fontSize={14}>{post.caption}</Text>
                </Flex>

                <Text fontSize={12} color={"gray"}>
                    {timeAgo(post.createdAt)}
                </Text>
            </Flex>
        </Flex>

    )
}

export default Caption
