"use client"

import { Switch } from '@tremor/react';
import { useSession } from 'next-auth/react';
import { updateUserPreferences } from '../lib/user';


export default function Preferences() {

    const { data: session, status, update } = useSession()
console.log('session', session);
    if (session === undefined){
        return;
    }
    const { user } = session
    let { preferences } = user


    async function updatePreferences(property: string, value: any) {
        preferences = JSON.parse(await updateUserPreferences(
            user.id,
            {
                ...preferences,
                [property]: value
            }
        ))
        const newSession = {
            ...session,
            user: {
                ...session?.user,
                preferences: {
                    ...preferences,
                    [property]: value,
                }
            },
        };
 
        await update(newSession);
    }

    return <form>
        <label>
            <Switch
                id="showControls"
                name="showControls"
                defaultChecked={preferences.showControls}
                // checked={preferences.showControls}
                onChange={async () => {
                    await updatePreferences('showControls', !preferences.showControls)
                }}
            />
            Show Controls
        </label>
        <label>
            <Switch
                id="wormhole"
                name="wormhole"
                defaultChecked={preferences.wormhole}
                onChange={() => {
                     updatePreferences('wormhole', !preferences.wormhole)
                }}
            />
            Wormhole
        </label>
        <label>
            <Switch
                id="obscure"
                name="obscure"
                defaultChecked={preferences.obscure}
                onChange={ () => {
                     updatePreferences('obscure', !preferences.obscure)
                }}
            />
            Obscure
        </label>
    </form>
}
