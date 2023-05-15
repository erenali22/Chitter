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
	let response = await fetch(`${BASE_URL}/api/auth/signup`, {
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
	return response.json();
};
export const newChater = async (content) => {
   let response = await fetch(`${BASE_URL}/api/chatters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
		  credentials: 'include',
        },
        body: JSON.stringify({ content }),
        credentials: 'include',
      });
	  return response.json();
};
export const authenticate = async () => {
return await fetch(`${BASE_URL}/api/auth`, {
	  headers: {
		'Content-Type': 'application/json',
		credentials: 'include',
	  },
	});


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

  //unlike
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
	  const response = await fetch(`${BASE_URL}/api/chatters/${id}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ content: updatedContent }),
	  });
	 return response.json()

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
export async function createRechatter(chatterId, content) {
    const response = await fetch(`${BASE_URL}/api/rechatters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chatter_id:chatterId, content })
    });
    return response.json();
}
export async function getRechatters(chatterId) {
    const response = await fetch(`${BASE_URL}/api/chatters/${chatterId}`);
    return response.json();
}

export async function updateRechatter(rechatterId, chatterId, content) {
    const response = await fetch(`${BASE_URL}/api/rechatters/${rechatterId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chatterId, content })
    });
    return response.json();
}
export async function deleteRechatter(rechatterId) {
    const response = await fetch(`${BASE_URL}/api/rechatters/${rechatterId}`, {
        method: 'DELETE'
    });
    return response.json();
}

export function getUsers() {
    return fetch(`${BASE_URL}/api/users/`).then(response => response.json());
}

function getUser(id) {
    return fetch(`${BASE_URL}/api/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.json());
}

function updateUser(id, data) {
    return fetch(`${BASE_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
}

export function getUserFeed() {
    return fetch(`${BASE_URL}/api/users/feed`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.json());
}
export const logout = () => {
	 return fetch(BASE_URL + "/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	}).then(response => response.json());
};



//follow
export async function followUser(userId) {

  const response = await fetch(`${BASE_URL}/api/follow/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

    return await response.json();

}

//unfollow
export async function unfollowUser(userId) {

  const response = await fetch(`${BASE_URL}/api/follow/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });


    return await response.json();

}

//get followers of a user
async function getFollowers(userId) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/follow/${userId}/followers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Error: ${response.statusText}`);
  }
}

//get followings of a user
export async function getFollowing(userId) {

  const response = await fetch(`${BASE_URL}/api/follow/${userId}/following`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Error: ${response.statusText}`);
  }
}
