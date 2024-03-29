USE [master]
GO
/****** Object:  Database [SME]    Script Date: 4/16/2022 10:25:34 AM ******/
CREATE DATABASE [SME]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SME', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SME.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SME_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SME_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SME] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SME].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SME] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SME] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SME] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SME] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SME] SET ARITHABORT OFF 
GO
ALTER DATABASE [SME] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SME] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SME] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SME] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SME] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SME] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SME] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SME] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SME] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SME] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SME] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SME] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SME] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SME] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SME] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SME] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SME] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SME] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SME] SET  MULTI_USER 
GO
ALTER DATABASE [SME] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SME] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SME] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SME] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SME] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SME] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SME] SET QUERY_STORE = OFF
GO
USE [SME]
GO
/****** Object:  User [IIS APPPOOL\sme-api]    Script Date: 4/16/2022 10:26:49 AM ******/
CREATE USER [IIS APPPOOL\sme-api] FOR LOGIN [IIS APPPOOL\sme-api] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [IIS APPPOOL\sme-api]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [IIS APPPOOL\sme-api]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 4/16/2022 10:27:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CourseId] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[ParentId] [bigint] NOT NULL,
	[CreatedDate] [datetimeoffset](7) NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CourseHistory]    Script Date: 4/16/2022 10:27:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CourseHistory](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CourseId] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[StartedDate] [datetimeoffset](7) NOT NULL,
	[LastSeen] [datetimeoffset](7) NOT NULL,
	[PlayedDurationMinutes] [int] NOT NULL,
	[CreatedDate] [datetimeoffset](7) NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_CourseHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 4/16/2022 10:27:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](max) NULL,
	[Descriptions] [nvarchar](max) NULL,
	[Tags] [nvarchar](max) NULL,
	[VideoURL] [nvarchar](max) NULL,
	[ThumbanilURL] [nvarchar](max) NULL,
	[DurationMinutes] [int] NOT NULL,
	[IsPublished] [bit] NOT NULL,
	[CreatedDate] [datetimeoffset](7) NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Investment]    Script Date: 4/16/2022 10:27:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Investment](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[InvestorName] [nvarchar](max) NULL,
	[InvestedAmount] [decimal](18, 2) NOT NULL,
	[ProfitPercentage] [decimal](18, 2) NOT NULL,
	[InvestedDate] [datetimeoffset](7) NOT NULL,
	[InvestmentMonths] [int] NOT NULL,
	[CreatedDate] [datetimeoffset](7) NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[InvetsmentType] [int] NOT NULL,
	[Status] [smallint] NOT NULL,
	[ReturnRequestedDate] [datetimeoffset](7) NOT NULL,
	[ReturnedDate] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_Investment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProfitPaid]    Script Date: 4/16/2022 10:27:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProfitPaid](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[InvestmentId] [bigint] NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[PaidDate] [datetimeoffset](7) NOT NULL,
	[PaidAmount] [decimal](18, 2) NOT NULL,
	[CreatedDate] [datetimeoffset](7) NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_ProfitPaid] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 4/16/2022 10:27:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[Phone] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[Role] [nvarchar](max) NULL,
	[RefreshToken] [nvarchar](max) NULL,
	[RefreshTokenExpiry] [datetime2](7) NULL,
	[CreatedDate] [datetimeoffset](7) NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[ResetCode] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[IsNewUser] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [SME] SET  READ_WRITE 
GO
