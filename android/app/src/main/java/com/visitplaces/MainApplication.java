package com.visitplaces;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;

// import org.devio.rn.splashscreen.SplashScreenReactPackage;
// import android.content.Context;
// import com.facebook.react.shell.MainReactPackage;
// import java.lang.reflect.InvocationTargetException;


 // <-- add this import

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  // @Override
  //       protected List<ReactPackage> getPackages() {
  //           return Arrays.<ReactPackage>asList(
  //                   new MainReactPackage(),
  //           new SplashScreenReactPackage()  //here 
  //           );
  //       }

  /**
   * Loads Flipper in React Native templates.
   *
  //  *
   */
  // private static void initializeFlipper(Context context) {
  //   if (BuildConfig.DEBUG) {
  //     try {
  //       /*
  //        We use reflection here to pick up the class that initializes Flipper,
  //       since Flipper library is not available in release mode
  //       */
  //       Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
  //       aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
  //     } catch (ClassNotFoundException e) {
  //       e.printStackTrace();
  //     } catch (NoSuchMethodException e) {
  //       e.printStackTrace();
  //     } catch (IllegalAccessException e) {
  //       e.printStackTrace();
  //     } catch (InvocationTargetException e) {
  //       e.printStackTrace();
  //     }
  //   }
  // }

 
}
