export default function Head() {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17686381075"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17686381075');
          `,
        }}
      />
    </>
  );
}


