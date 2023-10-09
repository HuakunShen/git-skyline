# Git-Skyline

> The official GitHub Skyline web app https://skyline.github.com/ stops working. Keeps saying "cannot find user".
>
> So I decided to make a clone of this project.

![demo img](./README.assets/git-skyline-demo.png)

## Features

- [x] 3D model
- [x] Contribution Year
- [x] Embed with `iframe`
- [x] Provide your own API Token
- [ ] Contribution by Date (given a start date and an end date)
- [ ] Git Providers
  - [x] GitHub
  - [ ] GitLab
  - [ ] Gitee

I thought about supporting other git providers like GitLab... But personally I only use GitHub.
If there are more people requesting support for other platforms, I will consider implementing it.
Feel free to send a PR for new features if you are willing to contribute.

### Embed Page

You can embed git-skyline webpage into your own web page using `iframe`, without the header/footer on the page, and options to disable zoom, pan, auto-rotate.

Click on the "Embed Page" button, it will take you to another web page with the 3D model alone. Put the url in an iframe.

```html
<iframe
  src="https://git-skyline.huakun.tech/contribution/github/huakunshen/embed?year=2023&enableZoom=false"
  width="100%"
  height="100%"
  frameborder="0"
></iframe>
```

#### Options

The model by default enables auto-rotate, damping, panning, zoom interations. Sometimes you may not want these interactions on your web page.

You can simply add search params into the url

e.g. `?enableZoom=false&enableZoom=false&enablePan=false&enableDamping=false&autoRotate=false&autoRotateSpeed=1`

See [source code](./apps/web/src/app/components/contribution-model.tsx) for how the search parameters are used.

#### Custom API Token

GitHub API requires API token, I am using my own token on server. To reduce cost and avoid flooding GitHub API (I may be banned), I implemented some simple in-memory caching to keep data in memory for ~1-2 days.

But it's possible for my API Token to be banned by GitHub due to massive amount of request.

In that case, if you are embeding this web app in your web page, you can provide your own GitHub token to avoid service down by adding the token in search params

e.g. `&token=github_pat_<123456>`

Generate a GitHub API token at https://github.com/settings/tokens.

Use a fine-grained token without any extra permission.

## Disclaimer

> This project is still in development, and may not be stable (in terms of up time and API). If you want a stable service, consider deploying your own. I didn't spend money for cache service, so it's technically possible that the app could crash due to memory overflow if too many people are using it.
>
> I will consider scaling up the service in the future if necessary.
