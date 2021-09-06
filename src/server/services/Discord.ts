export const getProfile = async (
  accessToken: string
): Promise<{
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
}> => {
  const { user } = await fetch('https://discord.com/api/oauth2/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.json());
  return user;
};


export const getAccessToken = async (code: string) => {
  const body = {
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
    grant_type: 'authorization_code',
    scope: 'identify guilds.join',
    code
  };
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'post',
    body: Object.keys(body)
      .map(
        key =>
          encodeURIComponent(key) + '=' + encodeURIComponent((body as any)[key])
      )
      .join('&'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }).then(res => res.json());
  return (response?.access_token as string) || null;
};

export const getLoginURL = (state: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string
  }&redirect_uri=${encodeURIComponent(
    process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI as string
  )}&response_type=code&scope=identify%20guilds.join&state=${state}`;

export const addToServer = async (userID: string, accessToken: string) => {
  const body = {
    access_token: accessToken
  };
  await fetch(
    `https://discord.com/api/v8/guilds/${
      process.env.DISCORD_SERVER_ID as string
    }/members/${userID}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => {
    if (res.status == 201) return res.json();
    else return res.text();
  });
};

export const removeFromServer = async (userID: string) => {
  await fetch(
    `https://discord.com/api/v8/guilds/${
      process.env.DISCORD_SERVER_ID as string
    }/members/${userID}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => {
    if (res.status == 201) return res.json();
    else return res.text();
  });
};

export const getRolesForUser = async (userId: string) => {
  return await fetch(
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json());
};

export const setRolesForUser = async (roles: string[], userID: string) => {
  await fetch(
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roles })
    }
  ).then(res => res.json());
};
export const addRoleForUser = async (roleId: string, userID: string) => {
  await fetch(
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}/roles/${roleId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.text());
};
export const removeRoleForUser = async (roleId: string, userID: string) => {
  await fetch(
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}/roles/${roleId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.text());
};

export const RolesToIDs: Record<string, string> = {
  'Ancient Helm': '884256511008854036',
  'Ancient Helm of Detection': '884237145852760095',
  'Ancient Helm of Enlightenment': '884437793416306799',
  'Ancient Helm of Skill': '884437339244478565',
  'Ancient Helm of Giants': '884437886882156544',
  'Ancient Helm of Brilliance': '884437926346371122',
  'Ancient Helm of Anger': '884437960148271174',
  'Ancient Helm of the Fox': '884437998127710249',
  'Ancient Helm of Reflection': '884438045892419654',
  'Ancient Helm of Titans': '884438084312264734',
  'Ancient Helm of Power': '884438126800551997',
  'Ancient Helm of Vitriol': '884438178390507590',
  'Ancient Helm of Protection': '884438216093085766',
  'Ancient Helm of Perfection': '884438328869543986',
  'Ancient Helm of the Twins': '884438252910702602',
  'Ancient Helm of Fury': '884438288369319976',
  'Ancient Helm of Rage': '884438322573901844'
};

export const AdminRoleID = '884439692676857917';
