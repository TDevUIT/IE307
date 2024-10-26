import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DownloadButtons = () => {
    return (
        <div className="flex">
            <Link
                href="https://itunes.apple.com/app/slowly/id1199811908?utm_source=website&utm_medium=main_area&utm_campaign=website_app_download"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-105"
            >
                <Image
                src="https://slowly.app/wp-content/themes/slowly/assets/img/ios-app-store.png"
                alt="Download on the App Store"
                width={180} 
                height={70}
                className="h-16"
                />
            </Link>
            <Link
                href="https://play.google.com/store/apps/details?id=com.slowlyapp&referrer=utm_source=website&utm_medium=main_area&utm_campaign=website_app_download"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-105"
            >
                <Image
                src="https://slowly.app/wp-content/themes/slowly/assets/img/google-play.png"
                alt="Get it on Google Play"
                width={180}
                height={70}
                className="h-16"
                />
            </Link>
        </div>
    );
};

export default DownloadButtons;
