from google_images_download import google_images_download


def downloadimages(query):
    response = google_images_download.googleimagesdownload()
    # keywords is the search query
    # format is the image file format
    # limit is the number of images to be downloaded
    # print urs is to print the image file url
    # size is the image size which can
    # be specified manually ("large, medium, icon")
    # aspect ratio denotes the height width ratio
    # of images to download. ("tall, square, wide, panoramic")
    arguments = {"keywords": query,
                 # "format": "jpg",
                 "limit": 5,
                 "print_urls": True}
    # "size": "large"}
    # "aspect_ratio": "panoramic" }

    try:
        response.download(arguments)

    # Handling File NotFound Error
    except FileNotFoundError:
        arguments = {"keywords": query,
                     "format": "jpg",
                     "limit": 4,
                     "print_urls": True,
                     "size": "medium"}

        # Providing arguments for the searched query
        try:
            # Downloading the photos based
            # on the given arguments
            response.download(arguments)
        except:
            pass


downloadimages("oneplus")