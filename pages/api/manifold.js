app.get('/verify', async (req: any, res: any) => {
    const token = req.query.token
    const response = await fetch('https://oauth2.manifoldxyz.dev/verify', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    
    if (response.status !== 200) return res.sendStatus(403);
    
    const responseJson = await response.json();
    const address = responseJson.unwrappedJWT?.address;
  
    if (!address) return res.sendStatus(403);
  
    // You now have the address associated with the authenticated session
    // do whatever you need
    
    return res.sendStatus(200);
  })