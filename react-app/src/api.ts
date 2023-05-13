const BASE_URL = 'https://chitter2.onrender.com';
export const getChatters = async () => {
    return await fetch(`${BASE_URL}/api/chatters`);
};
export const login = async ({ email, password }) => {
    return await fetch(`${BASE_URL}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			credentials: 'include',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});
};
export const signUp = async ({ username, email, password }) => {
	return await fetch(`${BASE_URL}/api/auth/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({
            username,
            email,
            password,
        }),
	});
};
export const newChater = async (content) => {
   return await fetch(`${BASE_URL}/api/chatters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
		  credentials: 'include',
        },
        body: JSON.stringify({ content }),
        credentials: 'include',
      });
};
export const authenticate = async () => {
return await fetch(`${BASE_URL}/api/auth`, {
	  headers: {
		'Content-Type': 'application/json',
		credentials: 'include',
	  },
	});
	if (response.ok) {
	  const data = await response.json();
	  if (data.errors) {
		return;
	  }
	  return data;
	}
  };
export async function likeChatter(id) {
	try {
	  const response = await fetch(`${BASE_URL}/api/chatters/${id}/like`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
	  });

	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  } else {
		console.log('Chatter liked successfully');
	  }
	} catch (error) {
	  console.log('Error:', error);
	}
  }

  // 取消点赞函数
  export async function unlikeChatter(id) {
	try {
	  const response = await fetch(`${BASE_URL}/api/chatters/${id}/unlike`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},

	  });

	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  } else {
		console.log('Chatter unliked successfully');
	  }
	} catch (error) {
	  console.log('Error:', error);
	}
  }
export async function deleteChatter(id) {
	try {
	  const response = await fetch(`${BASE_URL}/api/chatters/${id}`, {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		},
		// 这里可以添加任何需要发送的数据，例如用户凭证或其他信息
		// body: JSON.stringify({ key: 'value' })
	  });

	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  } else {
		console.log('Chatter deleted successfully');
	  }
	} catch (error) {
	  console.log('Error:', error);
	}
  }

  export async function updateChatter(id, updatedContent) {
	try {
	  const response = await fetch(`${BASE_URL}/api/chatters/${id}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ content: updatedContent }),
	  });

	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  } else {
		console.log('Chatter updated successfully');
	  }
	} catch (error) {
	  console.log('Error:', error);
	}
  }

  export async function createReply(chatterId, content) {
    const response = await fetch(`${BASE_URL}/api/chatters/${chatterId}/replies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    return response.json();
}
export async function getReplies(chatterId) {
    const response = await fetch(`${BASE_URL}/api/chatters/${chatterId}/replies`);
    return response.json();
}

export async function updateReply(replyId, content) {
    const response = await fetch(`${BASE_URL}/api/replies/${replyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    return response.json();
}
export async function deleteReply(replyId) {
    const response = await fetch(`${BASE_URL}/api/replies/${replyId}`, {
        method: 'DELETE',
    });
    return response.json();
}
