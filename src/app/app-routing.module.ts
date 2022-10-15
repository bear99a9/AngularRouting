import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
    {
        path: 'users', component: UsersComponent, children: [
            { path: ':id/:name', component: UserComponent }
        ]
    },
    {
        path: 'servers', //canActivate: [AuthGuard], 
        canActivateChild: [AuthGuard],
        component: ServersComponent, children: [
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
            { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
        ]
    },
    { path: '', component: HomeComponent },
    //{ path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
    { path: '**', redirectTo: '/not-found' } // needs to be last route as routes parsed from top to bottom
];
// In our example, we didn't encounter any issues when we tried to redirect the user. But that's not always the case when adding redirections.

// By default, Angular matches paths by prefix. That means, that the following route will match both /recipes  and just / 

// { path: '', redirectTo: '/somewhere-else' } 

// Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

// Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").

// To fix this behavior, you need to change the matching strategy to "full" :

// { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } 

// Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).

@NgModule({
    imports: [
        //RouterModule.forRoot(appRoutes, { useHash: true })
        //         1.

        // The server has to be configured in a way that it serves the index.html instead of a 404 page in each case an unknown url is requested,
        // so that Angular's router can handle the correct routing. - See this article of the official docs:

        // https://angular.io/guide/deployment#server-configuration​

        // 2.

        // We are using fake urls here, unlike in a traditional website, where the urls usually reflect the real places of the subpages.
        // In a SPA, when changing the url, we are not really moving to a different place but we only shift some content of the current view. 
        //Manipulating the urls in this way is only possible in modern browsers which support the History API. 
        //In older browsers you can mimic a similar behavior by using hashes for internal navigation on a page.

        // This would be the same if you would write your app in plain JavaScript and not in Angular.
        RouterModule.forRoot(appRoutes)

    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}